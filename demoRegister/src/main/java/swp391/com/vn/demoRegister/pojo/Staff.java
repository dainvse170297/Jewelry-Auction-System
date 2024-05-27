package swp391.com.vn.demoRegister.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "staff")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staff_id;

    @OneToOne
    @JoinColumn(name = "account_id",  unique = true)
    private Account account;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "staff_id")
    private List<FinancialProofRequest> financialProofRequestList;
}
