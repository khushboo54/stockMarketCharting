package com.khushboo.StockMarketCharting.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAlreadyExistException extends Throwable{
    private String message;
}
