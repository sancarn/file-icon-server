
import {platform} from "node:process";
import iconServer from "../index.js";

//Some simple test suite.
class Test {
    /**
     * The topic of the test
     * @param {string} topic 
     */
    constructor(topic){
        this.topic = topic
        this.status = true
    }

    /**
     * Check a condition
     * @param {string} text 
     * @param {boolean} condition 
     */
    check(text, condition){
        this.status = this.status && condition
        console.log((condition ? "[PASS] " : "[FAIL] ")  + text)
    }

    report(){
        console.log("------------------------------------")
        console.log((this.status ? "[PASS] " : "[FAIL] ") + this.topic)
    }
}

//Platform specific tests
let tests = new Test(platform)
switch(platform){
    case "win32":
        tests.check("Some dll", await iconServer.getIcon("C:\\Windows\\System32\\nsi.dll") == 
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALjSURBVFhH7ZfrT1JhHMf9k/o72rqoC8umTcucy+aNvDScpbhmrVprppkoSiCHO4JcjgkYeImmQqXNSyZGQuaU2uSFb7495wiOo8jsAJsvfLbPDuc5v+f5fp7nXDZyTmVrqhd+b2oQghdkrFAoPBebil9jJtrb2+MFM7b1gWgnLYl0BdYDa+lJpCvAHNOSyIQAA2+JTAkw8JLIpADDf0ukEvAtLENvfw+Lcwq70eiR6x2PxKxEMhobhDuxiNSNKU6cNEqCtrYj7G+rcxoaixNq8xgCwRB2d6MIhjY59cfBzBuLSN0OC9jHvdDZxmF1TLHBlOkdlEYaanKkhmkMqs0IboQ5Y5LBS2D9Zxg6qwuaEQdUpjEoSeCQwQ65zgqZdoSEmyCljBgdn+KEJYOXAHOf3V4fCR5lg12TM2zf0rc1EjyMfqUBlMGG8OZvTlgyeAkwbG5tQ6G34a3WgkUSHO+XKPTolWvh8Exz6o+Dl8BO5C/0Vidkmv3tVpto+OcXMeGdxRuZBj2DKnRJlZj7PM8JSwYvgWDoF/uQDaj2t1ui0LGr7pGp0T1Aoat/CJ19ctCuCU5YMngJMMz4F0AZyf2f8JJVq/GaBHeTVSsNFphpJ/oVWvIWhOD+8BGrgXXO2ER4CySiMtrwqk+BTokcgR/Bg373tBe3axtR2SBizyORPwfX4mREYJk8hLTLA7vDzZ5TRjNqm9tQdb8FpXfrcKOiCk0P23HrTjWpXeWMzYjAYWpErSirrse9FjFcnkl0SaS4WlIGQVEpjGYLpzYrAl++LqKksgYashPxvopqIUStYk4dQ1YEmtsfo6i8Em0dT7ERCsHn/4Tcguu4mC+A1mDg1GZFQPzkOQpLy1FQfBP5hcXIFRSy4ecv5cFqpzm1WRHYCIXhJx+hXukgLguu4ULeFczO+eD2HP0uZEUgztLyCp69eAmtnrvtiWRV4CScCZwJnFygvo7/n9NUkHljEael5eT8A20vCeTiYrmsAAAAAElFTkSuQmCC"
        )
        tests.check("Notepad", await iconServer.getIcon("C:\\Windows\\System32\\notepad.exe") == 
            "data:image/png;base64,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"
        )
        tests.report()
        iconServer.stop()
        break
    case "darwin":
        break
}

