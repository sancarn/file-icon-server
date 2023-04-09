# file-icon-server

## Install

```
npm install file-icon-server
```

For Windows, the server uses PowerShell to extract icons. Therefore you may need to [install powershell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.3).

For Mac, the server uses Swift to extract icons. Therefore if your OS is <10.10 you will need to download the [Swift runtime libraries](https://support.apple.com/kb/DL1998).

## Usage

```js
import server from 'file-icon-server'
server.getIcon("my/file/path1")
server.getIcon("my/file/path2")
server.getIcon("my/file/path3")

//Close server
server.stop()
```

or alternatively if you want initialisation to happen at a different time (usually it starts when getIcon is called for the first time):

```js
import server from 'file-icon-server'
server.start()

//...later...

server.getIcon("my/file/path")

//...later...

server.stop()
```

Icon is returned as a data url.


