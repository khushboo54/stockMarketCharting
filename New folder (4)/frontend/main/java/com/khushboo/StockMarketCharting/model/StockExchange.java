package com.khushboo.StockMarketCharting.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="stockexchange")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StockExchange {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name = "stockexchangename")
    @NotNull
    private String stockExchangeName;

    @Column(name = "brief")
    @NotNull
    private String brief;
    @Column(name = "contactaddress")
    @NotNull
    private String contactAddress;

    @Column(name = "remarks")
    @NotNull
    private String remarks;
    @OneToMany(mappedBy = "stockexchange",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyStock> companyStocks = new ArrayList<CompanyStock>();

}
