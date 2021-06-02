export interface ExpVersionEnt {
  ExperimentId: number;
  VersionId: number;
  VersionNo: number;
  StatusCode:string;
  IsSendForApproval:boolean;
  IsRework:boolean;
  IsAllowEdit:boolean;
  IsFavourite:boolean;
  IsAllowDiscontinue:boolean;
}

export interface ExperimentEnt {
  ExperimentId: number;
  ExperimentNo: string;
  VersionId: number;
  Title: string;
  ProgramCode: string;
  SampleBarcode:string;
  PatientId: string;
  BatchId: string;
  TestMaterial: string;
  QCTestType: string;
  Type: string;
  ExperimentDate: string;
  Aim: string;
  Rationale: string;
  WitnessId: number;
  QC_Reviewer_1: number;
  QC_Reviewer_2: number;
  QA_Reviewer_1: number;
  QA_Reviewer_2: number;
  QC_Approver: number;
  QA_Approver: number;
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

export interface EquipementDetailEnt {
  EquipementId: number;
  ExperimentId: number;
  VersionId: number;
  EquipementTypeName: string;
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

export interface SOPEnt{
  ExperimentId: number;
  VersionId: number;
  ProcedureFilePath: string;
  Title: string;
  QualificationStatus: boolean;
  Remark: string;
}

export interface ProcessEnt{
  Id: number;
  ExperimentId: number;
  VersionId: number;
  ContentType: string;
  ContentBody: string;
}