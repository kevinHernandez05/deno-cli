import { exec } from "https://deno.land/x/exec/mod.ts";

export class repository{
     
    public static  AntaresCloning(): void {
        let ANTARES_REPOSITORY: string = "https://github.com/ionic-dominicana/deno-dominicana.git";
        exec("git clone " + ANTARES_REPOSITORY);
        console.log("Project cloned, Happy coding! 🥳");
    }

}

export default repository;