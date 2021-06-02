export interface ExpVersionEnt {
  ExperimentId: number;
  VersionId: number;
  VersionNo: number;
  StatusCode: string;
  IsSendForApproval: boolean;
  IsRework: boolean;
  IsAllowEdit: boolean;
  IsFavourite: boolean;
  IsAllowDiscontinue: boolean;
}

export interface ExperimentEnt {
  ExperimentId: number;
  ExperimentNo: string;
  VersionNo: string;
  VersionId: number;
  Title: string;
  ProgramCode: string;
  TargetId: string;
  ELNType: string;
  ExperimentDate: string;
  Aim: string;
  Rationale: string;
  WitnessId: number;
  ReviewerId: number;
  ApproverId: number;
}

export interface InstrumentDetailEnt {
  InstrumentId: number;
  ExperimentId: number;
  VersionId: number;
  InstrumentTypeName: string;
  ManufactureName: string;
  StorageLocation: string;
  Model: string;
  CalibrationDue: Date;
  Remark: string;
  QualificationStatus: boolean;
}

export interface EquipmentDetailEnt {
  EquipmentId: number;
  ExperimentId: number;
  VersionId: number;
  EquipmentTypeName: string;
  ManufactureName: string;
  StorageLocation: string;
  Model: string;
  CalibrationDue: Date;
  Remark: string;
  QualificationStatus: boolean;
}

export interface MaterialDetailEnt {
  MaterialId: number;
  ExperimentId: number;
  VersionId: number;
  ManufactureName: string;
  LOTNo: string;
  CatalogueNo: string;
  ExpireDate: Date;
  Remark: string;
}

export interface SOPEnt {
  ExperimentId: number;
  VersionId: number;
  ProcedureFilePath: string;
  Title: string;
  QualificationStatus: boolean;
  Remark: string;
}

export interface ProcessEnt {
  Id: number;
  ExperimentId: number;
  VersionId: number;
  ContentType: string;
  ContentBody: string;
  OldContent:string;
  IsRefreshView:boolean;
}