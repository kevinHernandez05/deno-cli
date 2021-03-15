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
        let temp: string = JSON.stringify(project);
        let files: IFile[] = JSON.parse(temp);
        
        for (let index = 0; index < files.length; index++) {

            //if is file, create it!
            if(files[index].isFile === "yes"){
                await Deno.writeTextFile("./" + name + "/" + files[index].name + "." +  files[index].extension,  files[index].content)
                .then(()=> console.log("Creating file: " +  files[index].name + "." +  files[index].extension));
            }    
            else if (files[index].isFile === "no"){
                await ensureDir("./"+ name + "/" + files[index].name);
                await console.log("Creating directory: " + files[index].name);

                //has nested files? iterate them!
                try {
                 
                    if(files[index].nestedFiles !== undefined){
                        for (let subindex = 0; subindex < files[index].nestedFiles.length; subindex++) {
                            
                            
                            await Deno.writeTextFile("./" + name + "/" + files[index].name + "/" + files[index].nestedFiles[subindex].name + "." + files[index].nestedFiles[subindex].extension, files[index].nestedFiles[subindex].content)
                            .then(()=> console.log("Creating file: " + "/" + files[index].name + "/" + files[index].nestedFiles[subindex].name + "." + files[index].nestedFiles[subindex].extension));
     
                        }
                    }
                
                } catch (error) {
                    console.log("Error 004: there's invalid characters on the files.json of the generator, review it and try again.");
                }
            }        
        }

        //happy coding and return true. :D
        return true;
    }

    public static async deleteDirectory(){
        await Deno.remove('new-proj', { recursive: true });

    }

}

export default generator; 