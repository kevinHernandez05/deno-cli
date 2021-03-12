import messages from './messages.ts';

function name(param: string) {
    
    switch (param) {
        case "new":
            messages.NewMsg();
            break;
        
        case "help":
        case "?":
            messages.helpMsg();

            break;
        case undefined:
            messages.undefinedMsg();
            break;

        default:
            messages.unknowFlag(param);
            break;

    }

}

name(Deno.args[0]);
