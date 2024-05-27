package swp391.com.vn.demoRegister.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
