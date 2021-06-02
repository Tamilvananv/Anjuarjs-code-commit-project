export interface FeatureAndModule {
    GroupId: number;
    ModuleId: number;
    ModuleName: string;
    FeatureId: number;
    FeatureName: string;
    FeaturePath: string;
    FeatureURL: string
    FeatureParentId: number;
    FeatureCode: string;
    FeatureRead: Boolean;
    FeatureWrite: Boolean; 
}

export interface AdditionalUserInfoEnt
{
     UserId:number;
     EmployeeId :number;
     DateOfJoining : string;
     EmailId  : string;
}