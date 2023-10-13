export interface ApplicationError extends Error {
  status?: number;
}