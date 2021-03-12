import * as ink from 'https://deno.land/x/ink/mod.ts';
import { utils } from './utils.ts';
import { repository } from './repositories.ts';

export class messages{
    
    public static NewMsg():void {
        console.log(ink.colorize("<b>deno-cli -- new.</b>"));
        console.log(ink.colorize("<b>Cloning Antares' Deno Boilerplate...</b>"));
        repository.AntaresCloning();
    }
    
    public static helpMsg():void{
    
        console.log(ink.colorize("<b>deno-cli -- help.</b>"));
        console.log(ink.colorize("<b>*new:</b> Creates a new deno project with a boilerplate."));
        console.log(ink.colorize("<b>*help:</b> shows this page."));

    }

    public static undefinedMsg():void{
        console.log(ink.colorize("<red>deno-cli needs a flag in order to work.</red>"));
    }

    public static unknowFlag(param: string):void{
        console.log(ink.colorize("<red>the flag named "+ param +" does not exist.</red>"));

        if (!utils.stringLike(param))
            console.log(ink.colorize("<red>Check the flag and try it again.</red>"));

        else
            console.log(ink.colorize("<b><blue>did you mean: <b>" + utils.stringLike(param) + "</b>?</blue></b>"));

    }


}

export default messages;