package com.khushboo.StockMarketCharting.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="company_has_stockexchange")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CompanyStock {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name = "code")
    @NotNull
    private String companyCode;
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;
    @ManyToOne(fetch = FetchType.LAZY)
    private StockExchange stockexchange;

    public CompanyStock(String companyCode, Company company, StockExchange stockexchange) {
        this.companyCode = companyCode;
        this.company = company;
        this.stockexchange = stockexchange;
    }
}

