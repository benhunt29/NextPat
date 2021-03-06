
var countryList = function(searchResults){
    var countries = [];

    function ReturnedCountry(countryName,abbreviation,labor,climate,perCapitaPPP,urbanPopulation,largestCityPop,largestCityName,medianAge,internetUsagePerCapita,majorityLanguage){
        this.countryName = countryName;
        this.abbreviation = abbreviation;
        this.labor = labor;
        this.climate = climate;
        this.perCapitaPPP = perCapitaPPP;
        this.urbanPopulation = urbanPopulation;
        this.largestCityPop = largestCityPop;
        this.largestCityName = largestCityName;
        this.medianAge = medianAge;
        this.internetUsagePerCapita = internetUsagePerCapita;
        this.majorityLanguage = majorityLanguage;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //
    //function capitalizeFirstLetterOnly(string) {
    //    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    //}

    searchResults.forEach(function(item,index) {
        var countryName = capitalizeFirstLetter(item.name.name);
        var abbreviation = item.name.abbreviation;
        var laborAg = parseFloat(item.econ.labor_force_by_occupation.agriculture);
        var laborInd = parseFloat(item.econ.labor_force_by_occupation.industry);
        var laborSvc = parseFloat(item.econ.labor_force_by_occupation.services);
        var labor = {Agriculture: laborAg, Industry: laborInd, Services: laborSvc};
        var climate = item.geo.climate.text;
        var perCapitaPPP = item.econ.gdp_per_capita_ppp.text;
        var majorityLanguage = item.people.languages.text;

        if(majorityLanguage){
            majorityLanguage = majorityLanguage.match(/[^\s)]+/)[0];
        }

        if (perCapitaPPP) {
            perCapitaPPP = parseFloat(perCapitaPPP.match(/([^\s]+)/)[0].replace(/[^\d\.]/g, ''));
        }

        var largestCityPop = item.people.major_urban_areas_population.text;
        if (largestCityPop) {
            var largestCityName = largestCityPop.match(/.+?(?=\(capital|\d)/)[0];
            largestCityName = capitalizeFirstLetter(largestCityName.toLowerCase());
            largestCityPop = parseFloat(largestCityPop.match(/[^\.,s]\d.[^\s]+/)[0].replace(/[^\d\.]/g, ''));
            if(largestCityPop%1 != 0){
                largestCityPop *= 1000000;
            }

        }
        var urbanPopulation = parseFloat(item.people.urbanization.urban_population);
        var medianAge = parseFloat(item.people.median_age.total);
        var internetUsagePerCapita = 100*parseFloat(item.comm.internet_users.text) / parseFloat(item.people.population.text);
        var country = new ReturnedCountry(countryName,abbreviation,labor,climate,perCapitaPPP,urbanPopulation,largestCityPop,largestCityName,medianAge,internetUsagePerCapita,majorityLanguage);
        countries.push(country);
    });

    return countries;
};

module.exports = countryList;