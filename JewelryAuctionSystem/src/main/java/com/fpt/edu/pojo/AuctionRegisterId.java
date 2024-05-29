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
public class AuctionRegisterId implements java.io.Serializable {
    private static final long serialVersionUID = -7064762968249731090L;
    @Column(name = "register_id", nullable = false)
    private Integer registerId;

    @Column(name = "member_id", nullable = false)
    private Integer memberId;

    @Column(name = "lot_id", nullable = false)
    private Integer lotId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AuctionRegisterId entity = (AuctionRegisterId) o;
        return Objects.equals(this.registerId, entity.registerId) &&
                Objects.equals(this.lotId, entity.lotId) &&
                Objects.equals(this.memberId, entity.memberId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(registerId, lotId, memberId);
    }

}