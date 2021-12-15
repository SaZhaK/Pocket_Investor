package edu.invest.util

import edu.invest.exception.BackendException
import edu.invest.exception.CoreExceptionCode
import org.json.JSONObject
import org.springframework.stereotype.Service
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

@Service
class AssetUtil {

    fun getCurrentPrice(ticker: String): Double {
        val uri = URI.create("https://twelve-data1.p.rapidapi.com/price?symbol=" +
                ticker + "&format=json&outputsize=30")

        val request = HttpRequest.newBuilder()
                .uri(uri)
                .header("x-rapidapi-host", "twelve-data1.p.rapidapi.com")
                .header("x-rapidapi-key", "660d2ae754mshd9c68937f604b28p116b83jsn171254b36d43")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build()
        val response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString())

        val body = response.body()
        val jsonObject = JSONObject(body)

        val keySet = jsonObject.keySet()
        if (keySet.contains("code")) {
            val code = jsonObject.getInt("code")
            if (code == 429) {
                throw BackendException(CoreExceptionCode.ASSET_REQUEST_LIMIT)
            }
        }

        return jsonObject.getDouble("price")
    }
}