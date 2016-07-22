declare module "liftoff" {
  class LiftOff {
    constructor(options:{
      name:string;
      moduleName:string;
      configName:string;
      extensions:any[]
    });

    moduleName:string;
    configName:string;

    launch(options:{
      cwd:string;
      configPath:string;
      require:string;
      completion:string;
      verbose:string;
    }, invoke:(env:any)=>void)
  }

  export = LiftOff;
}