import React from "react";
import "./selling.scss"; // Import file SCSS đã tạo

const Selling = () => {
  const imgtitle =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1719906546/gavel-3577258_1280_uvqfxj.jpg";
  const CartierCrash =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720185837/0196a8aeb54b3d2bd837e3bc595949b4_r7qgze.jpg";
  const VintageFashion =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720185879/2021_NYR_19910_0105_000_chanel_important_suite_of_charm_jewelry121806_yjuqep.jpg";
  const RolexRainbow =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720185946/dong-ho-rolex-cosmograph-daytona-m116595rbowdp-rainbow-rolex_bjnmth.jpg";
  const CaratEmerald =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1720185975/5RCR05979-3_2a76d680-13bc-4113-90b8-9ecf41b14797_yrvfef.jpg";
  const Cambodian =
    "https://res.cloudinary.com/dhkmu458i/image/upload/v1719909868/Belperron-vintage-Pagoda-Bib-Necklace_cntnip.jpg";

  return (
    <>
      <div className="container-fluid">
        <div className="col-md-10 offset-md-1 my-5">
          <div className="text-center mb-5">
            <h1 className="titile"> About Selling</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-center h1">Selling with FU AUCTION</h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                Auction stands head and shoulders above the rest.
              </p>
              <div>
                <p className="text-center slogan md-5">
                  " FU Auction is a classy company that is laser-focused on
                  giving the seller the best experience possible... they do
                  exactly what they say they are going to do. "
                </p>
                <p className="text-center autho">
                  <strong>Hai Linh</strong>
                  <p className="text-center author"> Team 6 </p>
                </p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <h3>Ready to jump ahead and submit your valuation request?</h3>
              <img
                src={imgtitle}
                alt="Auction FU Image"
                className="img-fluid "
                style={{ maxWidth: "320px", maxHeight: "320px" }}
              />
              <p>
                To jump ahead and submit a valuation request, click the button
                below.
              </p>

              <a href="/create-valuation" className="btn request">
                Request A Valuation
              </a>

              <h3>Or want to learn more first?</h3>
              <p>
                To continue learning about selling with FU AUCTION, keep
                scrolling and reading.
              </p>
            </div>
          </div>

          <div className="text-center md-5 my-5">
            Now that you have an understanding of our mission and approach to
            selling at FU AUCTION, let’s delve deeper into the mechanics of our
            operation, and explore the topics that every potential seller should
            know. The following sections will highlight what makes FU AUCTION
            different and answer the question, “Why FU AUCTION?”, as well as
            walk you through the entire process from start to finish. This guide
            is designed to prepare you thoroughly for your selling journey with
            FU AUCTION, giving you the confidence to make informed decisions at
            every step of the way.
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center md-5 h1">Why Sell With FU AUCTION?</h1>
              <div className="my-5 whysell">
                <p>
                  At FU AUCTION, we’re committed to setting and upholding the
                  highest standards for our sellers. Selling jewelry and watches
                  can be a challenging and confusing process, but it doesn’t
                  have to be. With FU AUCTION by your side, you can rest assured
                  that your valuable assets are in the best hands possible.
                </p>
                <p>
                  We think of ourselves as a torch-bearer on the dimly-lit,
                  pitfall-filled path to selling jewelry and watches.
                </p>
                <p>
                  At FU AUCTION, our core values of integrity, authenticity,
                  accountability, and excellence are at the forefront of
                  everything we do. We believe our values, performance, and
                  reputation set us far apart from our competitors.
                </p>
                <p>
                  Here are the five (5) reasons that answer the question, “Why
                  Sell with FU AUCTION?”:
                </p>
              </div>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                1 of 5: Our Goals Are Aligned With Yours
              </h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                AUCTION stands head and shoulders above the rest.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={CartierCrash}
                alt="Auction FU Image"
                className="img-fluid"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <p className="img-content">
                The Cartier Crash 1991 Limited Edition; achieved a record-high
                $81,250 at FU AUCTION's 2019 IMPORTANT WATCHES auction.
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                2 of 5: We Have Solutions That Others Simply Do Not
              </h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                AUCTION stands head and shoulders above the rest.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={VintageFashion}
                alt="Auction FU Image"
                className="img-fluid"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <p className="img-content">
                Group of Chanel Vintage Fashion Costume Jewelry. Sold at one of
                FU AUCTION's auctions for $25,000.
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                3 of 5: We Are Trusted by Thousands of Sellers Worldwide
              </h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                AUCTION stands head and shoulders above the rest.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={RolexRainbow}
                alt="Auction FU Image"
                className="img-fluid"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <p className="img-content">
                Rolex Daytona "Rainbow" in 18K Gold with Box and Papers Sold at
                FU AUCTION for $375,000
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                4 of 5: Our Marketing Efforts Are Unmatched
              </h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                AUCTION stands head and shoulders above the rest.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={CaratEmerald}
                alt="Auction FU Image"
                className="img-fluid"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <p className="img-content">
                Exceptionally Rare Type IIA D/IF 6.01-Carat Emerald-Cut Diamond,
                GIA Certified with Mounting Sold at FU AUCTION for $260,000
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                5 of 5: We Provide Comprehensive Support Throughout the Process
              </h1>
              <p>
                FU AUCTION has been specifically designed to protect your
                interests and maximize your results in the shortest possible
                timeframe. With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating, FU
                AUCTION stands head and shoulders above the rest.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={Cambodian}
                alt="Auction FU Image"
                className="img-fluid"
                style={{ maxWidth: "350px", maxHeight: "350px" }}
              />
              <p className="img-content">
                Suzanne Belperron "Cambodian" Chalcedony Cuff w/ Certificate of
                Authenticity Sold at FU AUCTION for $137,500
              </p>
            </div>
          </div>

          <div className="text-center md-5 my-5">
            <h1 className="h1">
              Understanding the Selling Process with FU AUCTION
            </h1>
            <p>
              Now that you understand why selling with FU AUCTION is a smart
              choice, let’s delve into the process itself. We have broken down
              the process into seven clear, easy-to-understand steps to make
              sure you are well-prepared and confident every step of the way.
            </p>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 1: Initial Consultation</h1>
                <p>
                  Your journey begins with an initial consultation where our
                  experienced team will understand your needs and provide you
                  with tailored advice.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 2: Valuation</h1>
                <p>
                  We provide you with a professional valuation of your items,
                  ensuring transparency and accuracy.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 3: Agreement</h1>
                <p>
                  Once you are satisfied with the valuation, we proceed with a
                  formal agreement outlining all terms and conditions.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 4: Auction Preparation</h1>
                <p>
                  We prepare your items for auction with professional
                  photography, descriptions, and marketing materials.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 5: Auction Day</h1>
                <p>
                  Your items are showcased to a global audience on auction day,
                  maximizing exposure and potential bids.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step">
                <h1 className="text-center">Step 6: Post-Auction</h1>
                <p>
                  We handle all post-auction logistics, including payment
                  processing and item delivery to buyers.
                </p>
              </div>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-12">
              <div className="step text-center">
                <h1 className="text-center">Step 7: Settlement</h1>
                <p>
                  Finally, we ensure you receive your proceeds promptly and
                  provide a detailed settlement report for your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selling;
