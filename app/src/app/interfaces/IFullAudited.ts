export interface IFullAudited {
  createdAt?: number;
  modifiedAt?: number;
  deletedAt?: number;
  deleterId?: string;
  isDeleted?: boolean;
  isDisabled?: boolean;
}
