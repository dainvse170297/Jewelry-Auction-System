package com.fpt.edu.main;

import com.fpt.edu.entity.ValuationRequest;
import com.fpt.edu.enums.ValuationRequestStatus;
import com.fpt.edu.repository.IValuationRequestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class JewelryAuctionSystemApplicationTests {
	@Autowired
	private IValuationRequestRepository repo;
	//ahuiufghoauskdghylasdfghui
	@Test
	void contextLoads() {
		List<ValuationRequest> requests = repo.findByValuationStatus(ValuationRequestStatus.PRODUCT_RECEIVED);

		System.out.println(requests);
	}

}
