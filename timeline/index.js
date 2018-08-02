
var periodNext = $(this.base).find('.periods-container .btn-next');
var timelineNext = $(this.base).find('.timeline-container .btn-next');
var nextCardFunction;
var intervalVar;

var PRESTimeline = /** @class */ (function () {
    function PRESTimeline(target, color) {
        // this.__process_stylesheet(document.styleSheets[0]);
        this.base = target;
        this.color = color;
        // console.log(this.color)
        this.periodContainer = $(this.base).find('.periods-container');
        this.cardContainer = $(this.base).find('.cards-container');
        this.timelineNodeContainer = $(this.base).find('.timeline-container .timeline');
        // this.activePeriod = $(this.base).find('.periods-container section.active')
        this._parseData();
        this._initialColor();
        this._generateTimeline();
        this._setStateClasses();
        this._assignBtn();
        this._adjustPeriodContainer();
        this._adjustCardContainer();
        // console.log(this.cardData)
    }
    PRESTimeline.prototype._parseData = function () {
        var base = this.base;
        var periods = $(base).find('.periods-container section');
        for (var _i = 0, periods_1 = periods; _i < periods_1.length; _i++) {
            var section = periods_1[_i];
            section.period = $(section).attr('period');
            section.index = $(section).index();
        }
        // console.log(periods)
        this.periodData = periods;
        var data = $(base).find('.cards-container section');
        // console.log(data)
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var section = data_1[_a];
            section.period = $(section).attr('period');
            section.index = $(section).index();
        }
        // console.log(data)
        this.cardData = data;
        // #assign initial entry point (active items)
        this.activePeriod = this.periodData[0];
        this.activePeriodIndex = 0;
        this.activeCard = this.cardData[0];
        this.activeCardIndex = 0;
    };
    PRESTimeline.prototype._setStateClasses = function () {
        // # periods
        $(this.base).find('.periods-container section.active').removeClass('active');
        $(this.base).find('.periods-container section.prev').removeClass('prev');
        $(this.base).find('.periods-container section.next').removeClass('next');
        // console.log("setclass: " + this.activePeriod.index)
        $(this.activePeriod).addClass('active');
        // console.log(this.activePeriod.index)
        // this.activePeriodIndex = this.activePeriod.index
        if ($(this.activePeriod).prev().length != 0) {
            $(this.activePeriod).prev().addClass('prev');
            $(this.base).find('.periods-container .btn-back').removeClass('hide');
        }
        else {
            $(this.base).find('.periods-container .btn-back').addClass('hide');
        }
        if ($(this.activePeriod).next().length != 0) {
            $(this.activePeriod).next().addClass('next');
            $(this.base).find('.periods-container .btn-next').removeClass('hide');
        }
        else {
            $(this.base).find('.periods-container .btn-next').addClass('hide');
        }
        // ## cards
        $(this.base).find('.cards-container section.active').removeClass('active');
        $(this.base).find('.cards-container section.prev').removeClass('prev');
        $(this.base).find('.cards-container section.next').removeClass('next');
        $(this.activeCard).addClass('active');
        // this.activeCardIndex - this.activeCard.index
        if ($(this.activeCard).prev().length != 0) {
            $(this.activeCard).prev().addClass('prev');
        }
        if ($(this.activeCard).next().length != 0) {
            $(this.activeCard).next().addClass('next');
        }
        // ## timeline
        $(this.base).find('.timeline li.active').removeClass('active');
        // let findNode = $(this.base).find('.timeline ol li')[this.activeCard.index]
        $(this.timelineData[this.activeCard.index]).addClass('active');
        var timelineB = $(this.base).find('.timeline-container .btn-back');
        var timelineN = $(this.base).find('.timeline-container .btn-next');
        // console.log($(timelineN))
        if (this.activeCardIndex === 0) {
            timelineB.addClass('hide');
        }
        else {
            timelineB.removeClass('hide');
        }
        if (this.activeCardIndex >= this.cardData.length - 1) {
            timelineN.addClass('hide');
        }
        else {
            timelineN.removeClass('hide');
        }
    };
    // ## timeline generater
    PRESTimeline.prototype._generateTimeline = function () {
        // ## create node list
        var htmlWrap = '<ol></ol>';
        $(this.timelineNodeContainer).append(htmlWrap);
        var wrap = $(this.timelineNodeContainer).find('ol');
        var numNode = this.cardData.length;
        for (var i = 0; i < numNode; i++) {
            var c = this.cardData[i].color;
            var el = wrap.append('<li class="' + this.cardData[i].period + '" style="border-color: ' + c + '"></li>');
        }
        // ## width of timeline
        var nodeW = 200;
        wrap.css('width', nodeW * numNode - 16);
        var nodeList = $(this.base).find('.timeline ol li');
        this.timelineData = nodeList;
    };
    // ## assign button actions
    PRESTimeline.prototype._assignBtn = function () {
        var _this = this;
        var periodPrev = $(this.base).find('.periods-container .btn-back');
        periodNext = $(this.base).find('.periods-container .btn-next');
        periodPrev.click(function () {
            if (_this.activePeriodIndex > 0) {
                // console.log('prev')
                _this.activePeriodIndex -= 1;
                _this.activePeriod = _this.periodData[_this.activePeriodIndex];
                _this._chainActions('period');
                _this._setStateClasses();
            }
            _this._adjustPeriodContainer();
        });

        nextCardFuction = function nextCard() {
            if (_this.activeCardIndex < _this.cardData.length - 1) {
                _this.activeCardIndex += 1;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
            }
            else {
                _this.activeCardIndex += 0;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
            }
            _this._adjustCardContainer();
            _this._adjustPeriodContainer();
        }

        periodNext.click(function () {
            if (_this.activePeriodIndex < _this.periodData.length - 1) {
                // console.log('next' + this.activePeriodIndex)
                _this.activePeriodIndex += 1;
                _this.activePeriod = _this.periodData[_this.activePeriodIndex];
                _this._chainActions('period');
                _this._setStateClasses();
            }
            _this._adjustPeriodContainer();

        });
        var timelinePrev = $(this.base).find('.timeline-container .btn-back');
        timelineNext = $(this.base).find('.timeline-container .btn-next');
        timelinePrev.click(function () {
            if (_this.activeCardIndex > 0) {
                _this.activeCardIndex -= 1;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
            }
            _this._adjustCardContainer();
            _this._adjustPeriodContainer();
        });
        timelineNext.click(function () {
            if (_this.activeCardIndex < _this.cardData.length - 1) {
                _this.activeCardIndex += 1;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
            }
            else {
                _this.activeCardIndex = 0;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
            }
            _this._adjustCardContainer();
            _this._adjustPeriodContainer();
        });
        var _loop_1 = function (i) {
            $(this_1.timelineData[i]).click(function () {
                _this.activeCardIndex = _this.cardData[i].index;
                _this.activeCard = _this.cardData[_this.activeCardIndex];
                _this._chainActions('timeline');
                _this._setStateClasses();
                _this._adjustCardContainer();
                _this._shiftTimeline();
            });
        };
        var this_1 = this;
        // ## assign each timeline li
        for (var i = 0; i < this.timelineData.length; i++) {
            _loop_1(i);
        }
    };
    // ## color ##
    PRESTimeline.prototype._initialColor = function () {
        for (var i = 0; i < this.periodData.length; i++) {
            var p = this.periodData[i].period;
            this.periodData[i].color = this.color[p];
            var temp = this.periodData[i];
            $(temp).css('border-color', temp.color);
            $(temp).find('.year').css('color', temp.color);
            // ## color for timeline items, this part utilize the period name as class which will be add to the li later
            // ### cross browser bug fix
            var sbstyle = document.createElement("style");
            document.head.appendChild(sbstyle);
            // let sheet = document.styleSheets[0]
            sbstyle.sheet.insertRule('li.' + p + '.active { background-color: ' + this.color[p] + ' !important } ', 0);
            sbstyle.sheet.insertRule('li.' + p + '::before { background-color: ' + this.color[p] + ' } ', 0);
            sbstyle.sheet.insertRule('li.' + p + '::after { background-color: ' + this.color[p] + ' } ', 0);
        }
        for (var i = 0; i < this.cardData.length; i++) {
            var p = this.cardData[i].period;
            this.cardData[i].color = this.color[p];
            var temp = this.cardData[i];
            $(temp).css('border-color', temp.color);
            $(temp).find('.year').css('color', temp.color);
        }
    };
    PRESTimeline.prototype._adjustPeriodContainer = function () {
        var activeH = $(this.activePeriod).outerHeight();
        $(this.periodContainer).height(activeH);
        //console.log('top adjusted');
    };
    PRESTimeline.prototype._adjustCardContainer = function () {
        var activeH = $(this.activeCard).outerHeight() + 24;
        $(this.cardContainer).height(activeH);
        //console.log('bot adjusted');
    };
    PRESTimeline.prototype._shiftTimeline = function () {
        // #### We need to fix this part if using this component in different sizes ####
        var timelineW = $(this.base).find('.timeline-container').outerWidth();
        var timelinePadding = 210;
        var timelineCenter = 300;
        var liWidth = 16;
        var activeNodeX = $(this.timelineData[this.activeCardIndex]).position().left;
        var finalPos = -activeNodeX + timelinePadding;
        $(this.timelineNodeContainer).css('left', finalPos);
        //console.log(activeNodeX);
    };
    PRESTimeline.prototype._chainActions = function (state) {
        switch (state) {
            case 'period':
                //console.log('period');
                if (this.activePeriod.period != this.activeCard.period) {
                    // ## find the closest li with the active period
                    var ta = [];
                    for (var i = 0; i < this.cardData.length; i++) {
                        var temp = this.cardData[i];
                        if (this.activePeriod.period === temp.period)
                            ta.push(temp);
                    }
                    this.activeCard = ta[0];
                    this.activeCardIndex = ta[0].index;
                }
                break;
            case 'timeline':
                //console.log('timeline');
                if (this.activeCard.period != this.activePeriod.period) {
                    var ta = void 0;
                    for (var i = 0; i < this.periodData.length; i++) {
                        var temp = this.periodData[i];
                        if (this.activeCard.period === temp.period)
                            ta = temp;
                    }
                    this.activePeriod = ta;
                    this.activePeriodIndex = ta.index;
                }
                break;
        }
        this._shiftTimeline();
        this._adjustCardContainer();
    };
    return PRESTimeline;
}());

function autoTimeline(){
    //periodNext.click();
    timelineNext.click();
}
// ## document load ##
$(document).ready(function () {
    var colorcode = {
        'period1': '#db3236',
        'period2': '#f4c20d',
        'period3': '#32ccf4',
	'period4': '#4885ed',
	'period5': '#3cba54',
	'period0': '#4885ed'
		
    };
    var timeline = new PRESTimeline($('#this-timeline'), colorcode);
	//periodNext.click();
    intervalVar = window.setInterval(autoTimeline, 5000);

});



