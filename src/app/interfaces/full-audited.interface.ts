export interface IFullAudited {
  createdAt: number;
  modifiedAt?: number;
  deletedAt?: number | null;
  deleterId?: string | null;
  isDeleted?: boolean;
  isDisabled?: boolean;
}
