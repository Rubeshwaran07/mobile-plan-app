package com.mobileplan.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompareRequest {
    private List<String> planNames;
}
