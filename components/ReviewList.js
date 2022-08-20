app.component('review-list',{
  props: {
    reviews: {
      type: Array,
      required: true,
    }
  },
  template:
  variable = /*html*/
  `<div class="review-container">
      <h3>Reviews:</h3>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          {{ review.name }} gave this {{ review.rating }} Stars
          <br/>
          "{{ review.review }}"
        </li>
      </ul>
    </div>`
})