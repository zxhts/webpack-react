

type DefineFunction<P> = (param: P) => string;

type DefineOption<P> = {
    dingtalk?: DefineFunction<P>;
    wxwork?: DefineFunction<P>;
    feishu?: DefineFunction<P>;
    cordova?: DefineFunction<P>;
};

enum platform {
    "dingtalk" = 0,
    "wxwork",
    "feishu",
    "cordova"
}

export function defineApi<P>(platformCode: number,option: DefineOption<P>){
    // @ts-ignore
    return function(param: P = {}){
        return option[platform[platformCode]].call(null, param);
    }
}