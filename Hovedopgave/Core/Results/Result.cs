﻿namespace Hovedopgave.Core.Results;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }

    public static Result<T> Success(T value)
    {
        return new Result<T>
        {
            IsSuccess = true, Value = value
        };
    }

    public static Result<T> Failure(string error, int code)
    {
        return new Result<T>
        {
            IsSuccess = false, Error = error, Code = code
        };
    }
}