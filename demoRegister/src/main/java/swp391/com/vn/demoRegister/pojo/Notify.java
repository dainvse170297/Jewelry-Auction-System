package swp391.com.vn.demoRegister.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "notify")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Notify {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int notify_id;

        @ManyToOne(cascade = CascadeType.ALL)
        @JoinColumn(name = "member_id")
        private Member member;

        @Column(length = 50)
        private String title;
        @Column(length = 255)
        private String desciption;
        private Date date;
}
