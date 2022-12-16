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
    public class TherapistsController : ControllerBase
    {
        private readonly PsychotherapyClinicDBContext _context;

        public TherapistsController(PsychotherapyClinicDBContext context)
        {
            _context = context;
        }

        // GET: api/Therapists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TherapistDTO>>> GetTherapists()
        {
            var data = await _context.Therapists.Select(x=>new TherapistDTO()
            {
                Id = x.Id,
                Name = x.Name,
                Surname = x.Surname,
                RoomId = x.RoomId
            }).ToListAsync();
            return data;
        }

        // GET: api/Therapists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TherapistDTO>> GetTherapist(int id)
        {
            var therapist = await _context.Therapists.FindAsync(id);
            if (therapist == null)
            {
                return NotFound();
            }
            var therapistDTO = new TherapistDTO()
            {
                Id = therapist.Id,
                Name = therapist.Name,
                Surname = therapist.Surname,
                RoomId = therapist.RoomId
            };



            return therapistDTO;
        }

        // PUT: api/Therapists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut/*("{id}")*/]
        public async Task<IActionResult> PutTherapist(/*int id,*/ TherapistDTO therapistDTO)
        {
            try
            {
                var currentTherapist = _context.Therapists.Where(x => x.Id == therapistDTO.Id).First();
                currentTherapist.Name = therapistDTO.Name;
                currentTherapist.Surname = therapistDTO.Surname;
                currentTherapist.RoomId = therapistDTO.RoomId;

                _context.Entry(currentTherapist).State = EntityState.Modified;
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            /*            _context.Entry(therapist).State = EntityState.Modified;

                        try
                        {
                            await _context.SaveChangesAsync();
                        }
                        catch (DbUpdateConcurrencyException)
                        {
                            if (!TherapistExists(id))
                            {
                                return NotFound();
                            }
                            else
                            {
                                throw;
                            }
                        }

                        return NoContent();*/
        }

        // POST: api/Therapists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TherapistDTO>> PostTherapist(TherapistDTO therapistDTO)
        {
            var therapist = new Therapist()
            {
                Name = therapistDTO.Name,
                Surname = therapistDTO.Surname,
                RoomId = therapistDTO.RoomId
            };
            _context.Therapists.Add(therapist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTherapist", new { id = therapist.Id }, therapist);
        }

        // DELETE: api/Therapists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTherapist(int id)
        {
            var therapist = await _context.Therapists.FindAsync(id);
            if (therapist == null)
            {
                return NotFound();
            }

            _context.Therapists.Remove(therapist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TherapistExists(int id)
        {
            return _context.Therapists.Any(e => e.Id == id);
        }
    }
}
