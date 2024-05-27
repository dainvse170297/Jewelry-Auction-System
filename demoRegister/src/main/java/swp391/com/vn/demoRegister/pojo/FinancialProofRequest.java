package swp391.com.vn.demoRegister.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FinancialProofRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int financialProofRequestId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "financial_proof_request_id")
    private List<FinancialProofImage> financialProofImages;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 255)
    private  String image;
    private  int status;
    @Column(precision = 19, scale = 1)
    private BigDecimal financialProofAmount;
}
