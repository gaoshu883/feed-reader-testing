/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        // 此处进行了修改
        // 对url进行格式匹配
        it('each feed has a URL', function() {
            allFeeds.forEach(function(item) {
                var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; // 检查 URL 格式是否正确的正规表达式
                expect(item.url).toBeDefined();
                expect(item.url).toMatch(regularExpressionUrl); // 检查格式
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function() {
            allFeeds.forEach(function(item) {
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // Expect that the body element has `menu-hidden` class
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        // Trigger the click event twice and
        // check the menu-hidden class of body element each time
        it('changes visibility when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // 修改成简化形式
        // 不需要使用匿名函数
        beforeEach(function(done) {
            // console.log('我要去加载数据了');
            loadFeed(0, done);
        });

        // Only when `done` of `beforeEach` is triggered,
        // `are loaded` testing spec can be executed
        // 这里做了修改：并不是异步测试，所以不需要done参数
        it('are loaded', function() {
            // console.log('我应该后出来');
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            // done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Cache for previous content
        var preContent;
        // The older feed
        // Put the older content into the `preContent` variable
        beforeEach(function(done) {
            loadFeed(1, function() {
                preContent = $('.feed').html();
                done();
            });

        });
        // The new feed
        // Expect the new content is not the older one
        it('changes the content', function(done) {
            loadFeed(2, function() {
                expect($('.feed').html()).not.toBe(preContent);
                done();
            });
        });
    });
});
