package com.khushboo.StockMarketCharting.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="stockprice")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StockPrice {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name = "currentprice")
    @NotNull
    private BigDecimal currentPrice;
    @Column(name = "date")
    @NotNull
    private String date;
    @Column(name = "time")
    @NotNull
    private String time;
    @Column(name = "companycode")
    @NotNull
    private String companyCode;
    @Column(name = "stockexchangename")
    @NotNull
    private String stockExchangeName;
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;
}
