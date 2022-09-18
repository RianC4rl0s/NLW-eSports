export interface GameParam{
    id:string;
    title:string;
    banner:string;
}

export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            home:undefined;
            game:GameParam;
        }
    }
}