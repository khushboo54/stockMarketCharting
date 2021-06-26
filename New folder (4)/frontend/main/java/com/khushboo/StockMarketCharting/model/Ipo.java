package com.khushboo.StockMarketCharting.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="ipo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Ipo {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Column(name = "price")
    private BigDecimal price;
    @NotNull
    @Column(name = "shares")
    private int shares;
    @NotNull
    @Column(name = "opendatetime")
    private String openDateTime;
    @NotNull
    @Column(name = "remarks")
    private String remarks;

    @Column(name = "companyname")
    @NotNull
    private String companyName;
    @Column(name = "stockexchangename")
    @NotNull
    private String stockExchangeName;
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

}
