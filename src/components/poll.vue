<template>
    <div class="p-article_share l-content_padding -sm">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/charts.css/dist/charts.min.css">

        <div v-if="!showVotingOptions">
            <div class="poll-results">
                <h2>読者の皆さまのご意見</h2>
                    <table id="poll-chart" class="charts-css bar show-labels show-data-axes data-spacing-8">
                    <caption>読者の皆さまのご意見</caption>
                    <thead>
                        <tr>
                            <th scope="col"> Title </th>
                            <th scope="col"> Progress </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="item in pollResults">
                            <template v-if="item.relatedTopic == pollID">
                                <tr v-for="(itemPoll, indexPoll) in item.options" :key="indexPoll">
                                    <th scope="row">{{ itemPoll.title }}</th>
                                    <td v-if="itemPoll.count > 0" class="pollPercentage" style="--color: #2FB5CE" v-bind:style="{ '--size': Math.max(((itemPoll.count / calculateTotalCount(item.options)) * 100).toFixed(0) / 100, 0) }">
                                        &nbsp;
                                    </td>
                                    <td v-else class="pollNoData" style="--size: 0.1; --color: none">
                                        &nbsp;
                                    </td>
                                    <span class="percentage">{{ ((itemPoll.count / calculateTotalCount(item.options)) * 100).toFixed(0) }}%</span>
                                </tr>
                            </template>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="pollBtn">
                <button class="c-btn_main-dark c-btn submit-btn" @click="showVotingOptions = true">あなたの意見を投票する</button>
            </div>
        </div> 
        <div v-else class="pollWrapper">
            <h2>選択して「投票する」ボタンをクリックしてください。</h2>
            <form @submit.prevent="submitVote">
                <!-- <p v-if="submitButtonClicked && !selectedOption" class="alert-message">選択を選んでください。</p> -->
                <div v-for="(item, index) in pollResults" :key="index">
                    <div v-if="item.relatedTopic == pollID">
                        <div v-for="(itemPoll, indexPoll) in item.options" :key="indexPoll" class="pollOptions">
                            <label>
                                <input
                                    type="radio"
                                    :value="`questionnaire_${indexPoll + 1}`"
                                    v-model="selectedOption"
                                >
                                {{ itemPoll.title }}
                            </label>
                        </div>
                    </div>
                </div>
                <div v-if="!hasVoted">
                    <div class="pollBtn">
                        <button type="submit" class="c-btn_main-dark c-btn submit-btn" @click="preventMultipleClicks" :disabled="isPollExpired || isSubmitting">
                            {{ isPollExpired ? '投票期限切れ' : 'あなたの意見を投票する' }}
                        </button>
                    </div>
                    <p v-if="isPollExpired" class="expired-text">この投票は期限切れです。</p>
                    <div v-if="voteSubmitted">
                        <p class="thank-you-message">ご投票ありがとうございました!</p>
                    </div>
                </div>
                <div v-else>
                    <div class="pollBtn">
                        <button type="submit" class="c-btn_main-dark c-btn submit-btn" :disabled="hasVoted">
                            {{ isPollExpired ? '投票期限切れ' : 'あなたの意見を投票する' }}
                        </button>
                    </div>
                    <p v-if="isPollExpired" class="expired-text">この投票は期限切れです。</p>
                    <p v-if="hasVoted" class="voted-text">投票済みです</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';


export default {
  name: 'Poll',
  props: ['pollID', 'topicID'],
  data() {
        return {
            title: '',
            url: '',
            description: '',
            showVotingOptions: false,
            isPollExpired: false,
            isSubmitting: false,
            selectedOption: null,
            submitButtonClicked: false,
            hasVoted: false,
            voteSubmitted: false,
            showResults: false,
            pollResults: [],
        }
  },
  mounted() {
        this.url = window.location.href;
        this.title = document.title;
        this.submitVote();
        this.checkVotingCookie();
        this.pollList();
  },
  methods: {
    checkVotingCookie() {
        this.hasVoted = Cookies.get('hasVoted') === 'true';
    },
    calculateTotalCount(options) {
        return options.reduce((total, option) => {
        return total + option.count;
        }, 0);
    },
    pollList() {
        let url = '/rcms-api/1/content/list?topics_group_id=21';
        const self = this;
        this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {

            const topics = [];
            
            for (let key in response.data.list) {
                let item = response.data.list[key];

                    const options = [];
                        for (let i = 1; i <= 10; i++) {
                        const pollLabel = `questionnaire_title_${i}`;
                        const pollCount = `questionnaire_${i}`;
                        
                        if (item[pollLabel] !== null && item[pollLabel] !== '') {
                            options.push({
                                title: item[pollLabel],
                                count: item[pollCount],
                            });
                        }
                    }
                topics.push({
                    dueDate: item.ext_1,
                    options: options,
                    relatedTopic: item.topics_id,
                });
                // Check due date for the poll
                const currentDate = new Date();
                self.isPollExpired = new Date(item.ext_1) < currentDate;

            }
            self.pollResults = topics;
            })
            .catch(function (error) {
            // console.log(error.response.data.errors?.[0].message);
            });
    },
    preventMultipleClicks() {
      if (!this.isSubmitting) {
        this.isSubmitting = true;

        this.submitVote();

        setTimeout(() => {
          this.isSubmitting = false;
        }, 7000);
      }
    },
    submitVote() {
        this.submitButtonClicked = true;

        if (!this.selectedOption) {
            return;
        }

        if (this.selectedOption && this.pollID) {
            const optionTitle = this.selectedOption.substring(14); // Remove 'questionnaire_' prefix
            const endpoint = `/rcms-api/3/questionnaire_${optionTitle}/${this.pollID}`;
            // console.log(optionTitle);

            const payload = {
               num: 1,
            };
            
            const self = this;
            this.$store.$auth.ctx.$axios
                .post(endpoint, payload)
                .then(response => {
                    this.voteSubmitted = true;
                    this.showResults = true;

                    const scrollPosition = window.scrollY;
                    
                    setTimeout(() => {
                        self.showVotingOptions = false;
                        Cookies.set('hasVoted', 'true', { expires: 365 });
                        location.reload();

                        window.onload = function () {
                            window.scrollTo(0, scrollPosition);
                        };
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error submitting vote:', error);
                })
        } 
    }
  },
}
</script>

<style scoped>
.poll-results {
  margin-top: 20px;
}
.pollBtn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.pollOptions {
    display: flex;
    padding-bottom: 16px;
}
.pollOptions input {
    margin-right: 4px;
    cursor: pointer;
}
.pollOptions label {
    font-size: 16px;
    cursor: pointer;
}
.pollPercentage {
    line-height: 26px;
}
.poll {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

#bar-example-10 {
  height: 200px;
  max-width: 300px;
  margin: 0 auto;
}

#poll-chart {
    max-width: 100%;
    margin: 20px auto;
}
#poll-chart.bar {
    --labels-size: 220px;
} 

.charts-css.bar.show-labels tbody tr th {
    align-items: flex-end;
    padding-right: 16px;
}

.percentage {
    position: absolute;
    right: 10px;
    top: 10px;
}
.poll-results h2 {
    font-size: 22px;
    border-bottom: 1px solid #000;
    display: inline-block;
} 
.alert-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid red;
    padding: 12px;
}
.expired-text {
    text-align: center;
    margin-top: 12px;
    font-weight: bold;
}
.voted-text,
.thank-you-message {
    text-align: center;
    margin-top: 14px;
    color: green;
    font-weight: bold;
}

</style>
