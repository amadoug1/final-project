import { useState } from "react";

function Quote() {
  const [businessType, setBusinessType] = useState("restaurant");
  const [customBusiness, setCustomBusiness] = useState("");
  const [websiteTier, setWebsiteTier] = useState("basic");
  const [deliveryPlatforms, setDeliveryPlatforms] = useState([]);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Determine if business involves food
  const isFoodBusiness =
    businessType === "restaurant" ||
    (businessType === "other" &&
      /food|cater|restaurant|kitchen|bakery|cafe|coffee|dessert/i.test(
        customBusiness
      ));

  const togglePlatform = (platform) => {
    if (deliveryPlatforms.includes(platform)) {
      setDeliveryPlatforms(deliveryPlatforms.filter((p) => p !== platform));
    } else {
      setDeliveryPlatforms([...deliveryPlatforms, platform]);
    }
  };

  const getQuote = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType:
            businessType === "other" ? customBusiness : businessType,
          services: isFoodBusiness
            ? ["website", "delivery"]
            : ["website"],
          websiteTier,
          deliveryPlatforms: isFoodBusiness ? deliveryPlatforms : [],
          addons: [],
        }),
      });

      const data = await response.json();
      setPrice(data.quote.totalPrice);
    } catch (error) {
      console.error("Error getting quote:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading ||
    (businessType === "other" && customBusiness.trim() === "");

  return (
    <div className="page">
      <h1>Get a Marketing Quote</h1>

      {/* Business Type */}
      <label>
        Business Type:
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        >
          <option value="restaurant">Restaurant</option>
          <option value="barber">Barbershop</option>
          <option value="shop">Retail Shop</option>
          <option value="other">Other / Independent Business</option>
        </select>
      </label>

      {businessType === "other" && (
        <label>
          Describe Your Business:
          <input
            type="text"
            placeholder="Photographer, Catering business, Coffee brand, etc."
            value={customBusiness}
            onChange={(e) => setCustomBusiness(e.target.value)}
          />
        </label>
      )}

      <br />

      {/* Website Tier */}
      <label>
        Website Package:
        <select
          value={websiteTier}
          onChange={(e) => setWebsiteTier(e.target.value)}
        >
          <option value="basic">Basic (1–3 pages)</option>
          <option value="standard">Standard (4–7 pages)</option>
          <option value="advanced">Advanced (8+ pages)</option>
        </select>
      </label>

      <br />

      {/* ✅ Delivery Platforms – ONLY for food businesses */}
      {isFoodBusiness && (
        <>
          <p>Delivery Platforms:</p>

          <label>
            <input
              type="checkbox"
              checked={deliveryPlatforms.includes("ubereats")}
              onChange={() => togglePlatform("ubereats")}
            />
            UberEats
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={deliveryPlatforms.includes("doordash")}
              onChange={() => togglePlatform("doordash")}
            />
            DoorDash
          </label>

          <br />
        </>
      )}

      <br />

      <button onClick={getQuote} disabled={isDisabled}>
        {loading ? "Calculating..." : "Get Quote"}
      </button>

      {price !== null && (
        <>
          <h2>Your Estimated Price: ${price.toLocaleString()}</h2>
          <p>This is an estimate. Final pricing may vary.</p>
        </>
      )}
    </div>
  );
}

export default Quote;
