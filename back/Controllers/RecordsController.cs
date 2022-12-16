using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Exam_Prep.DB;
using Exam_Prep.Entities;
using Exam_Prep.DTO;

namespace Exam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly PsychotherapyClinicDBContext _context;

        public RecordsController(PsychotherapyClinicDBContext context)
        {
            _context = context;
        }

        // GET: api/Records
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecordDTO>>> GetRecords()
        {
            var data =  await _context.Records.Select(record=>new RecordDTO()
            {
                Id = record.Id,
                PatientName = record.PatientName,
                PatientSurname = record.PatientSurname,
                RecordTime = record.RecordTime,
                Description = record.Description,
                Frequency = record.Frequency,
                TherapistId = record.TherapistId

            }).ToListAsync();
            return data;
        }

        // GET: api/Records/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecordDTO>> GetRecord(int id)
        {
            var @record = await _context.Records.FindAsync(id);

            if (@record == null)
            {
                return NotFound();
            }
            var recordDTO = new RecordDTO()
            {
                Id = record.Id,
                PatientName = record.PatientName,
                PatientSurname = record.PatientSurname,
                RecordTime = record.RecordTime,
                Description = record.Description,
                Frequency = record.Frequency,
                TherapistId = record.TherapistId
            };


            return recordDTO;
        }
        // GET: api/Records/5
        [HttpGet("search/{patientSurname}")]
        public async Task<ActionResult<IEnumerable<RecordDTO>>> GetRecord(string patientSurname)
        {
            var data = await _context.Records.Where(r => r.PatientSurname.Equals(patientSurname)).Select(record => new RecordDTO()
            {
                Id = record.Id,
                PatientName = record.PatientName,
                PatientSurname = record.PatientSurname,
                RecordTime = record.RecordTime,
                Description = record.Description,
                Frequency = record.Frequency,
                TherapistId = record.TherapistId

            }).ToListAsync();
            if (data == null)
            {
                return NoContent();
            }
            return data;
        }
        // PUT: api/Records/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{currentTherapistId}")]
        public async Task<IActionResult> PutRecord(int currentTherapistId, RecordDTO recordDTO)
        {
            if (currentTherapistId != recordDTO.TherapistId)
            {
                return BadRequest();
            }
            var @record = _context.Records.Where(record => record.Id == recordDTO.Id).First();
            _context.Entry(@record).State = EntityState.Modified;

            try
            {
                record.PatientSurname = recordDTO.PatientSurname;
                record.PatientName = recordDTO.PatientName;
                record.RecordTime = recordDTO.RecordTime;
                record.Description = recordDTO.Description;
                record.Frequency = recordDTO.Frequency;
                if (record.TherapistId != recordDTO.TherapistId)
                {
                    var newTherapist = _context.Therapists.Where(x => x.Id == recordDTO.Id).First();
                    var oldTherapist = _context.Therapists.Where(x => x.Id == record.Id).First();
                    oldTherapist.Records.Remove(record);
                    record.TherapistId = recordDTO.TherapistId;
                    // currentRecord.Patient = _context.Patients.Where(x => x.Id == @record.Id).First();
                    if (newTherapist.Records == null)
                    {
                        newTherapist.Records = new List<Record>();
                    }
                    newTherapist.Records.Add(record);
                }
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(recordDTO.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Records
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecordDTO>> PostRecord(RecordDTO recordDTO)
        {
            var record = new Record()
            {
                PatientName = recordDTO.PatientName,
                PatientSurname = recordDTO.PatientSurname,
                RecordTime = recordDTO.RecordTime,
                Description = recordDTO.Description,
                Frequency = recordDTO.Frequency,
                TherapistId = recordDTO.TherapistId
            };
            var therapist = _context.Therapists.Where(x => x.Id == @recordDTO.TherapistId).First();
            if (therapist.Records == null)
            {
                therapist.Records = new List<Record>();
            }
            therapist.Records.Add(record);
            _context.Records.Add(record);
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new { id = @record.Id }, @record);
        }

        // DELETE: api/Records/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord(int id)
        {
            var @record = await _context.Records.FindAsync(id);
            if (@record == null)
            {
                return NotFound();
            }

            _context.Records.Remove(@record);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecordExists(int id)
        {
            return _context.Records.Any(e => e.Id == id);
        }
    }
}
