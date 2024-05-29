package com.fpt.edu.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
public class BidId implements java.io.Serializable {
    private static final long serialVersionUID = -1699941777237052238L;
    @Column(name = "bids_id", nullable = false)
    private Integer bidsId;

    @Column(name = "member_id", nullable = false)
    private Integer memberId;

    @Column(name = "lot_id", nullable = false)
    private Integer lotId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BidId entity = (BidId) o;
        return Objects.equals(this.bidsId, entity.bidsId) &&
                Objects.equals(this.lotId, entity.lotId) &&
                Objects.equals(this.memberId, entity.memberId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bidsId, lotId, memberId);
    }

}