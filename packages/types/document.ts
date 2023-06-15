export interface DocumentCommon {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateWriteOpResult {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export interface ResType<T> {
  message: "success";
  data?: T;
}
