package com.hospital.controller;

import com.hospital.entity.MedicalRecord;
import com.hospital.service.MedicalRecordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medical-records")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    // Add Medical Record
    @PostMapping
    public MedicalRecord addMedicalRecord(@Valid @RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.saveMedicalRecord(medicalRecord);
    }

    // Get All Medical Records
    @GetMapping
    public List<MedicalRecord> getAllMedicalRecords() {
        return medicalRecordService.getAllMedicalRecords();
    }

    // Get Medical Record By ID
    @GetMapping("/{id}")
    public Optional<MedicalRecord> getMedicalRecordById(@PathVariable Long id) {
        return medicalRecordService.getMedicalRecordById(id);
    }

    // Update Medical Record
    @PutMapping("/{id}")
    public MedicalRecord updateMedicalRecord(@PathVariable Long id,
                                             @Valid @RequestBody MedicalRecord medicalRecord) {
        return medicalRecordService.updateMedicalRecord(id, medicalRecord);
    }

    // Delete Medical Record
    @DeleteMapping("/{id}")
    public String deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return "Medical Record deleted successfully!";
    }
}