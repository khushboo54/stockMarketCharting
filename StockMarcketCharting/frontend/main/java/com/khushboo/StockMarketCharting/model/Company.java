package com.khushboo.StockMarketCharting.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="company")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Company {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name = "companyname")
    @NotNull
    private String companyName;
    @Column(name = "ceo")
    @NotNull
    private String ceo;
    @Column(name = "turnover")
    @NotNull
    private BigDecimal turnover;
    @Column(name = "boardofdirectors")
    @NotNull
    private String boardOfDirectors;
    @Column(name = "description")
    @NotNull
    private String description;
    @Column(name = "stockexchangename")
    @NotNull
    private String stockExchangeName;
    @Column(name = "sectorname")
    @NotNull
    private String sectorName;
    @Column(name = "companycode")
    @NotNull
    private String companyCode;
    @ManyToOne(fetch = FetchType.LAZY)
    private Sectors sectors;
    @OneToMany(mappedBy = "company")
    private List<CompanyStock> companyStocks = new ArrayList<CompanyStock>();
    @OneToMany(mappedBy = "company")
    private List<Ipo> ipos = new ArrayList<Ipo>();
    @OneToMany(mappedBy = "company",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockPrice> stockPrices = new ArrayList<StockPrice>();
}
