var app = new Vue({
  el: '#main',
  data: {
    searchString: "",
    counterparties: MyData
  },
  computed: {
    filteredCounterparties: function() {
      var counterparty_array = this.counterparties,
      searchString = this.searchString;

      // строка поиска не заполнена, выводим все
      if (!searchString){
        return counterparty_array;
      }

      searchString = searchString.trim().toLowerCase();
      counterparty_array = counterparty_array.filter(function(item){
        if(item.name.toLowerCase().indexOf(searchString) !== -1){
            return item;
        }
      })
      return counterparty_array;
    },
    filteredFuzzy: function() {
      var full_array = this.counterparties,
      searchString = this.searchString;
      
      // строка поиска не заполнена, выводим все
      if (!searchString){
        full_array.forEach(function(item){
          item.count = 0;
        })
      
        return full_array;
      }

      searchString = searchString.trim().toLowerCase();

      // формируем массив для отображения
      full_array = full_array.filter(function(item){
        item.count = app.levenshtein(item.name, searchString);
        //if (item.count <= 15) {
          return item
        //}
      })
  
      full_array.sort(function(a,b){
        return a.count - b.count;
      })
      return full_array;
    }
  
  },
  methods: {
    levenshtein: function (s1, s2, costs) {
      var vm = this;
      var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
      l1 = s1.length;
      l2 = s2.length;
  
      costs = costs || {};
      var cr = costs.replace || 1;
      var cri = costs.replaceCase || costs.replace || 1;
      var ci = costs.insert || 1;
      var cd = costs.remove || 1;
  
      cutHalf = flip = Math.max(l1, l2);
  
      var minCost = Math.min(cd, ci, cr);
      var minD = Math.max(minCost, (l1 - l2) * cd);
      var minI = Math.max(minCost, (l2 - l1) * ci);
      var buf = new Array((cutHalf * 2) - 1);
  
      for (i = 0; i <= l2; ++i) {
          buf[i] = i * minD;
      }
  
      for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
          ch = s1[i];
          chl = ch.toLowerCase();
  
          buf[flip] = (i + 1) * minI;
  
          ii = flip;
          ii2 = cutHalf - flip;
  
          for (j = 0; j < l2; ++j, ++ii, ++ii2) {
              cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
              buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
          }
      }
      return buf[l2 + cutHalf - flip];
    },
    retRand: function() {
      var vm = this;
      return Math.round(Math.random() * (10 - 1) + 1);
    }
  }

});