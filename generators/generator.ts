import { ensureDir, exists } from "https://deno.land/std/fs/mod.ts";
import { readJson } from 'https://deno.land/x/jsonfile/mod.ts';

import { IFile } from "./file.model.ts";

export class generator{
    
    public static async generateProject(name: string){

        //If we don't give the project's name...
        if(name == undefined || name == ""){
            console.log("Make sure to put a name for your new project.");
            return false;
        }  

        //if the project already exist...
        if(await exists("./" + name)){
            console.log("There's a project named " + name + ", try to create the proj. elsewhere." );
            return false;
        }

        //create the folder that will contain the project
        ensureDir("./" + name);

        //read json with the project's files info
        let project: any; 

        try {
            project = await readJson('./generators/files.json');

        } catch (error) {
            console.log("Make sure files.json is on the generators' directory.");
            return false;
        }      

        //Mapping and create files from object to file
        const files: IFile[] = project as IFile[];
        
        files.forEach(file => {
       
            //if is folder, create it
            if(file.isFile === "yes"){
                let write = Deno.writeTextFile("./" + name + "/" + file.name + "." + file.extension, file.content);
                write.then(()=> console.log("Creating file: " + file.name + "." + file.extension));
            }

            else{
                ensureDir("./"+ name + "/" + file.name);
                console.log("Creating directory: " + file.name);

                //TODO: create nested files
                //has nested files? iterate them!
                if(typeof(file.nestedFiles) !== 'string'){
                   Array.from(file.nestedFiles).forEach(nestedFile =>{
                        //and after that create them!
                        let write = Deno.writeTextFile("./" + name + "/" + file.name + "/"+ nestedFile.name + "." + nestedFile.extension, nestedFile.content);
                        write.then(()=> console.log("Creating file: " + nestedFile.name + "." + nestedFile.extension));
                    });
                }
            }
           

        });

        //happy coding and return true. :D
        return true;
    }

}

export default generator; 