import { exec } from "https://deno.land/x/exec/mod.ts";
import { generator } from "./generators/generator.ts";


export class repository{
     
    // public static  AntaresCloning(): void {
    //     let ANTARES_REPOSITORY: string = "https://github.com/ionic-dominicana/deno-dominicana.git";
    //     exec("git clone " + ANTARES_REPOSITORY);
    //     console.log("Project cloned, Happy coding! 🥳");
    // }

    public static AntaresCloning(): void{

        generator.generateProject("new-proj");
        console.log("Project cloned, Happy coding! 🥳");

    }
}

export default repository;