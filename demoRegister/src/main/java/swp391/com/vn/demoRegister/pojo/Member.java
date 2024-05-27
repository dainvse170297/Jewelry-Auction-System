package swp391.com.vn.demoRegister.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int member_id;

    @OneToOne
    @JoinColumn(name = "account_id",unique = true)
    private Account account;
    @Column(precision = 19, scale = 1)
    private BigDecimal price;
    @Column(length = 100)
    private String address;
    @Column(length = 10)
    private String phone;
    @Column(length = 50)
    private String fullname;
    @Column(length = 50)
    private String email;

}
