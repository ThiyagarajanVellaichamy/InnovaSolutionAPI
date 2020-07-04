using System;
namespace ServiceProvider.Contracts.Common
{
    public class Result<T>
    {
        public T Data { get; }
        public Status Status { get; }
        public string Message { get; }

        public Result(T data, Status status, string message)
        {
            this.Data = data;
            this.Status = status;
            this.Message = message;
        }
    }

    public enum Status
    {
        Success = 1,
        Failed = 2,
        Warning = 3,
        NoResult = 0
    }
}
