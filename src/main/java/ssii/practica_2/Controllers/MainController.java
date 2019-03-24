package ssii.practica_2.Controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class MainController {
    @RequestMapping("/front")
    public String inicio(Map<String, Object> model) {
        return "index";
    }
}