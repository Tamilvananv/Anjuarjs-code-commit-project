export interface Permission {
    PermissionId: number;
    PermissionName: string;
    PermissionDescription: string;
}

export interface FeatureAndModule {
    PermissionId: number;
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