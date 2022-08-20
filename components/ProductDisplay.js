app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: variable = /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" :class="{ 'out-of-stock-img': !inStock }"> <!-- :src => v-bind -->
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="onSale">{{ saleMessage }}</p>
        <p>{{ description }}</p>
        
        <!--<p v-if="inventory > 10">In Stock</p> // v-show if false it will be display = hidden 
            <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p>
            <p v-else>Out of Stock</p>  <p v-else>Out of Stock</p> // no need v-else if we have one element -->
      
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }">
            </div>

            <div class="buttons">
              <button 
                class="button" 
                :class="{disabledButton: !inStock}"
                :disabled="!inStock" 
                @click="addToCart">
                  Add to Cart
              </button> <!-- v-on:click -->
              <button 
                class="button"  
                :class="{disabledButton: !inStock}"
                :disabled="!inStock"
                @click="removeFromCart">
                  Remove from Cart
              </button> <!-- v-on:click -->
            </div>
        <!-- <p v-if="onSale">OnSale !</p> -->
      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`

  ,data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      description: "A warm fuzzy pair of socks.",
      onSale: true,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [{
        id: 2234,
        color: "green",
        image: "./assets/images/socks_green.jpg",
        quantity: 50,
      },
      {
        id: 2235,
        color: "blue",
        image: "./assets/images/socks_blue.jpg",
        quantity: 0,
      },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    saleMessage() {
      if (this.onSale) {
        return this.brand + " " + this.product + " is on sale.";
      }
      return "";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  }
});