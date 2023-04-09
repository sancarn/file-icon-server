import {platform} from 'node:process';
import {PowerShell} from 'node-powershell';
import {fileIconToBuffer} from 'file-icon'; //TODO: Use jxa hosted in a pseudo-terminal instead?

export class FileIconServer {
    constructor(){
        this.host = null;
    }

    /**
     * Get icon from path
     * @param {string} path Path of file to find
     */
    async getIcon(path){
        if(!this.host) this.start()
        switch(platform){
            case "darwin":
                //TODO: Use jxa hosted in a pseudo-terminal instead?
                return "data:image/png;base64," + await fileIconToBuffer(path).toString("base64")
            case "win32":
                return (await this.host.invoke(`getIcon("${path}")`)).raw;
        }
    }

    /**
     * Dispose of the host binary/shell environment. Call this function when you no longer need to obtain images of paths.
     * @returns 
     */
    async stop(){
        switch(platform){
            case "win32":
                let ret = await this.host.dispose()
                this.host = false
                return ret
            case "darwin":
                this.host = false
                return
        }
    }

    /**
     * Initialises host binary/shell environment. You can call this function at application start. If not it will be called when getIcon() is first called.
     * @protected
     * @returns {boolean} Success
     */
    async start(){
        switch(platform){
            case "win32":
                this.host = new PowerShell({
                    debug: false,
                    executableOptions: {
                        '-ExecutionPolicy': 'Bypass',
                        '-NoProfile': true,
                        },
                })
                await this.host.invoke(`
                    Add-Type -AssemblyName System.Drawing
                    function getIcon($path){
                        $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($Path)
                        $bitmap = $icon.ToBitmap()
                        $stream = New-Object System.IO.MemoryStream
                        $bitmap.save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
                        $bytes = $stream.ToArray()
                        $b64 = [convert]::ToBase64String($bytes)
                        $stream.Flush()
                        $stream.Dispose()
                        return "data:image/png;base64," + $b64
                    }
                `)
                return true
            case "darwin":
                this.host = true
                return true
        }
    }
}


export default new FileIconServer