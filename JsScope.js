(function () {

    describe('Scope Exercises',function(){

        var ACTUAL;

        beforeEach(function(){
            ACTUAL = null;
        });

        it('a function has access to its own local scrope variables', function(){
            var fn = function(){
                var name = 'inner';
                ACTUAL = name;

            };

            fn();
            expect(ACTUAL === 'inner').to.be.true;

        });

        it('inputs to a function are treated as local scope variables', function(){
            var fn = function(name){
                ACTUAL = name;
            };

            fn('inner');
            expect(ACTUAL === 'inner').to.be.true;

        });

        it('block scope can be created with let', function(){
            var fn = function(){
                var where = 'outer';
                {
                    let where = 'inner';
                }

                ACTUAL = where

            };

            fn();
            expect(ACTUAL === 'outer').to.be.true;


        });

        it('a function has access to the variables contained within the same scope that function was created in', function(){

            var name = 'outer';
            var fn = function(){
                ACTUAL = name;
            };

            fn();
            expect(ACTUAL === 'outer').to.be.true;

        });

        it('a function\'s local scope variables are not available anywhere outside that function', 
            function(){
                var firstFn = function(){
                    var localToFirstFn = 'inner';
                };

                firstFn();
                expect(function(){
                    ACTUAL = localToFirstFn;
                }).to.throw();

                expect(ACTUAL===null).to.be.true;
        });

        it('a function\'s local scope variables are not available anywhere outside that function, \
            regardless of the context it is called in', function(){

                var firstFn = function(){
                    var localToFirstFn = 'first';
                    secondFn();
                };

                var secondFn = function(){
                    ACTUAL = localToFirstFn
                };

                expect(function(){secondFn();}).to.throw();
                expect(function(){firstFn();}).to.throw();
                expect(ACTUAL===null).to.be.true;                

            });

        it('if an inner and an outer variable share the same name, and the name is referenced in the \
            inner scope, the inner scope variable masks the variable from the outer scope with the same\
            name. This renders the outer scope variables inaccessible from anywhere within the inner \
            function block', function(){

                var sameName = 'outer';
                var fn = function(){
                    var sameName = 'inner';
                    ACTUAL = sameName;
                };

                fn();
                expect(ACTUAL===inner).to.be.true;

            });

        it('a new variable scope is crated for every call to a function, as exemplified with a counter', function(){
            var fn = function(){
                var innerCounter = innerCounter || 10;
                innerCounter = innerCounter + 1;
                ACTUAL = innerCounter;
            };

            fn();
            expect(ACTUAL===11).to.be.true;
            fn();
            expect(ACTUAL===11).to.be.true;
        });

        it('between calls to an inner function, that inner function retains access to a variable in an outer scpe.\
         Modifying those variables has a lasting effect between calls to the inner function.', function(){

            var outerCounter = 10;
            var fn = function(){
                outerCounter = outerCounter + 1;
                ACTUAL = outerCounter;
            };

            fn();
            expect(ACTUAL===11).to.be.true;
            fn();
            expect(ACTUAL===12).to.be.true;

         });

        it('the rule about retaining access to variables from an outer scope still applied, even\
            after the outer function call has returned', function(){
                var outerFn = function(){
                    var counterInOuterScope = 10;
                    
                    var innerIncrementingFn = function(){
                        counterInOuterScope = counterInOuterScope + 1;
                        ACTUAL = counterInOuterScope;
                    };

                    innerIncrementingFn();
                    expect(ACTUAL===11).to.be.true;
                    innerIncrementingFn();
                    expect(ACTUAL===12).to.be.true;

                    window.retainedInnerFn = innerIncrementingFn;
                };

                expect(window.retainedInnerFn).to.equal.undefined;

                outerFn();
                expect(window.retainedInnerFn).to.be.a('function');
                window.retainedInnerFn();
                expect(ACTUAL===13).to.be.true;
        });


    })





})