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
@Table(name="sectors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Sectors {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;


    @Column(name = "name")
    @NotNull
    private String name;
    @Column(name = "description")
    @NotNull
    private String description;
    @OneToMany(mappedBy = "sectors")
    private List<Company> companies = new ArrayList<Company>();


    public Sectors(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}
