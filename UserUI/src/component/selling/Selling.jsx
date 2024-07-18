import React from "react";
import "./selling.scss"; // Import file SCSS đã tạo

const Selling = () => {
  const imgtitle =
    "data:image/png;base64,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";
  const CartierCrash =
    "https://bizweb.dktcdn.net/thumb/2048x2048/100/175/988/files/avw-cartier-crash-tank-paris-7-extra-jpeg.jpg?v=1624525391431";
  const VintageFashion =
    "https://m.media-amazon.com/images/I/71DAxIiczyL._AC_UY1000_.jpg";
  const RolexRainbow =
    "https://24kara.com/files/sanpham/4930/1/jpg/dong-ho-rolex-cosmograph-daytona-m116595rbowdp-rainbow-rolex.jpg";
  const CaratEmerald =
    "https://m.media-amazon.com/images/I/71-3aIc95mL._AC_UY1000_.jpg";
  const Cambodian =
    "https://belperron.com/wp-content/uploads/2019/10/Vintage-Cambodian-Cuff_Agate-Sapphire_STANDING_19_RESIZED-2_498x498_acf_cropped.jpg";

  return (
    <>
      <div className="container-fluid">
        <div className="col-md-10 offset-md-1 my-5">
          <div className="text-center mb-5">
            <h1 className="titile"> About Selling</h1>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-center h1">Selling with FUJA</h1>
              <p>
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
              </p>
              <div>
                <p className="text-center slogan md-5">
                  " FUJA is a classy company that is laser-focused on giving the
                  seller the best experience possible... they do exactly what
                  they say they are going to do. "
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
                To continue learning about selling with FUJA, keep scrolling and
                reading.
              </p>
            </div>
          </div>

          <div className="text-center md-5 my-5">
            Now that you have an understanding of our mission and approach to
            selling at FUJA, let’s delve deeper into the mechanics of our
            operation, and explore the topics that every potential seller should
            know. The following sections will highlight what makes FUJA
            different and answer the question, “Why FUJA?”, as well as walk you
            through the entire process from start to finish. This guide is
            designed to prepare you thoroughly for your selling journey with
            FUJA, giving you the confidence to make informed decisions at every
            step of the way.
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center md-5 h1">Why Sell With FUJA?</h1>
              <div className="my-5 whysell">
                <p>
                  At FUJA, we’re committed to setting and upholding the highest
                  standards for our sellers. Selling jewelry and watches can be
                  a challenging and confusing process, but it doesn’t have to
                  be. With FUJA by your side, you can rest assured that your
                  valuable assets are in the best hands possible.
                </p>
                <p>
                  We think of ourselves as a torch-bearer on the dimly-lit,
                  pitfall-filled path to selling jewelry and watches.
                </p>
                <p>
                  At FUJA, our core values of integrity, authenticity,
                  accountability, and excellence are at the forefront of
                  everything we do. We believe our values, performance, and
                  reputation set us far apart from our competitors.
                </p>
                <p>
                  Here are the five (5) reasons that answer the question, “Why
                  Sell with FUJA?”:
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
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
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
                $81,250 at FUJA's 2019 IMPORTANT WATCHES auction.
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                2 of 5: We Have Solutions That Others Simply Do Not
              </h1>
              <p>
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
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
                FUJA's auctions for $25,000.
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                3 of 5: We Are Trusted by Thousands of Sellers Worldwide
              </h1>
              <p>
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
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
                FUJA for $375,000
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                4 of 5: Our Marketing Efforts Are Unmatched
              </h1>
              <p>
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
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
                GIA Certified with Mounting Sold at FUJA for $260,000
              </p>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-md-6">
              <h1 className="text-center h1">
                5 of 5: We Provide Comprehensive Support Throughout the Process
              </h1>
              <p>
                FUJA has been specifically designed to protect your interests
                and maximize your results in the shortest possible timeframe.
                With our unique model, we are at the forefront of
                revolutionizing the industry, merging the tried-and-true methods
                of traditional auction houses with the dynamism of modern
                innovative marketplace models, utilizing cutting-edge technology
                and focusing on an unyielding commitment to customer service.
              </p>
              <p>
                With the lowest seller’s fees/premiums, very frequent
                (bi-weekly) auctions, a substantial global following,
                record-breaking results, and a flawless 5-star Google rating,
                FUJA stands head and shoulders above the rest.
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
                Authenticity Sold at FUJA for $137,500
              </p>
            </div>
          </div>

          <div className="text-center md-5 my-5">
            <h1 className="h1">Understanding the Selling Process with FUJA</h1>
            <p>
              Now that you understand why selling with FUJA is a smart choice,
              let’s delve into the process itself. We have broken down the
              process into seven clear, easy-to-understand steps to make sure
              you are well-prepared and confident every step of the way.
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
