package com.fpt.edu.entity;

import com.fpt.edu.status.NotifyType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notify")
public class Notify {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notify_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "member_id", nullable = true)
    private Member member;

    @Column(name = "title", length = 255)
    private String title;

    @Column(name = "description", length=1000)
    private String description;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "notifiable_id", nullable = true)
    private Integer notifiableId;

    @Column(name = "notifiable_type", nullable = true)
    @Enumerated(EnumType.STRING)
    private NotifyType notifiableType;

}